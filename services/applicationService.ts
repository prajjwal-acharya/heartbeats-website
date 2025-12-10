import {
    collection,
    addDoc,
    getDocs,
    doc,
    updateDoc,
    deleteDoc,
    query,
    orderBy,
    where,
    Timestamp,
    getDoc
} from 'firebase/firestore';
import { db } from './firebaseConfig';

export interface Application {
    id?: string;
    rollNumber: string;
    name: string;
    email: string;
    phone: string;
    role: string;
    otherRole?: string;
    whyRole: string;
    whyHeartbeats: string;
    demoLink: string;
    status: 'pending' | 'reviewed' | 'accepted' | 'rejected';
    submittedAt: Timestamp;
    updatedAt?: Timestamp;
}

const COLLECTION_NAME = 'applications';

/**
 * Check if an application with this roll number already exists
 */
export const checkExistingApplication = async (rollNumber: string): Promise<Application | null> => {
    try {
        const q = query(
            collection(db, COLLECTION_NAME),
            where('rollNumber', '==', rollNumber.toUpperCase())
        );
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            const doc = querySnapshot.docs[0];
            return {
                id: doc.id,
                ...doc.data(),
            } as Application;
        }
        return null;
    } catch (error) {
        console.error('Error checking existing application:', error);
        throw new Error('Failed to check existing application.');
    }
};

/**
 * Submit a new application to Firestore
 */
export const submitApplication = async (applicationData: Omit<Application, 'id' | 'status' | 'submittedAt'>): Promise<string> => {
    try {
        // Store roll number in uppercase for consistent comparison
        const docRef = await addDoc(collection(db, COLLECTION_NAME), {
            ...applicationData,
            rollNumber: applicationData.rollNumber.toUpperCase(),
            status: 'pending',
            submittedAt: Timestamp.now(),
        });
        return docRef.id;
    } catch (error) {
        console.error('Error submitting application:', error);
        throw new Error('Failed to submit application. Please try again.');
    }
};

/**
 * Get all applications (for admin)
 */
export const getApplications = async (): Promise<Application[]> => {
    try {
        const q = query(collection(db, COLLECTION_NAME), orderBy('submittedAt', 'desc'));
        const querySnapshot = await getDocs(q);

        return querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        } as Application));
    } catch (error) {
        console.error('Error fetching applications:', error);
        throw new Error('Failed to fetch applications.');
    }
};

/**
 * Get a single application by ID
 */
export const getApplicationById = async (id: string): Promise<Application | null> => {
    try {
        const docRef = doc(db, COLLECTION_NAME, id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return {
                id: docSnap.id,
                ...docSnap.data(),
            } as Application;
        }
        return null;
    } catch (error) {
        console.error('Error fetching application:', error);
        throw new Error('Failed to fetch application.');
    }
};

/**
 * Update application status
 */
export const updateApplicationStatus = async (
    id: string,
    status: Application['status']
): Promise<void> => {
    try {
        const docRef = doc(db, COLLECTION_NAME, id);
        await updateDoc(docRef, {
            status,
            updatedAt: Timestamp.now(),
        });
    } catch (error) {
        console.error('Error updating application status:', error);
        throw new Error('Failed to update application status.');
    }
};

/**
 * Delete an application
 */
export const deleteApplication = async (id: string): Promise<void> => {
    try {
        const docRef = doc(db, COLLECTION_NAME, id);
        await deleteDoc(docRef);
    } catch (error) {
        console.error('Error deleting application:', error);
        throw new Error('Failed to delete application.');
    }
};

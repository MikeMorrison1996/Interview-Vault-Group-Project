import AsyncStorage from '@react-native-async-storage/async-storage';
import { Application } from '../types/Application';

const STORAGE_KEY = 'interview_vault_applications';

// ─── READ ───────────────────────────────────────────────────────────────────

/**
 * Returns all saved applications, sorted by createdAt descending (newest first).
 * Returns an empty array on error so callers never receive null.
 */
export const getApplications = async (): Promise<Application[]> => {
    try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (!raw) return [];
        const parsed: Application[] = JSON.parse(raw);
        return parsed.sort(
            (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
    } catch (error) {
        console.error('getApplications error:', error);
        return [];
    }
};

/**
 * Returns a single application by id, or null if not found.
 */
export const getApplicationById = async (id: string): Promise<Application | null> => {
    try {
        const all = await getApplications();
        return all.find((app) => app.id === id) ?? null;
    } catch (error) {
        console.error('getApplicationById error:', error);
        return null;
    }
};

// ─── CREATE ─────────────────────────────────────────────────────────────────

/**
 * Saves a new application. Generates id and createdAt automatically.
 * Returns the saved application.
 */
export const saveApplication = async (
    data: Omit<Application, 'id' | 'createdAt'>
): Promise<Application> => {
    const newApp: Application = {
        ...data,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
    };

    const existing = await getApplications();
    const updated = [newApp, ...existing];
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return newApp;
};

// ─── UPDATE ─────────────────────────────────────────────────────────────────

/**
 * Updates an existing application by id.
 * Throws if the application is not found.
 */
export const updateApplication = async (
    id: string,
    data: Omit<Application, 'id' | 'createdAt'>
): Promise<Application> => {
    const existing = await getApplications();
    const index = existing.findIndex((app) => app.id === id);

    if (index === -1) {
        throw new Error(`Application with id "${id}" not found.`);
    }

    const updated: Application = {
        ...existing[index],
        ...data,
    };

    existing[index] = updated;
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
    return updated;
};

// ─── DELETE ─────────────────────────────────────────────────────────────────

/**
 * Deletes an application by id.
 */
export const deleteApplication = async (id: string): Promise<void> => {
    const existing = await getApplications();
    const filtered = existing.filter((app) => app.id !== id);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
};

// ─── UTILITIES ──────────────────────────────────────────────────────────────

/**
 * Returns total count and upcoming interview count for the Home screen dashboard.
 */
export const getApplicationStats = async (): Promise<{
    total: number;
    upcomingInterviews: number;
}> => {
    const all = await getApplications();
    const now = new Date();

    const upcomingInterviews = all.filter((app) => {
        if (!app.interviewDate) return false;
        const interviewDate = new Date(app.interviewDate);
        return interviewDate >= now;
    }).length;

    return { total: all.length, upcomingInterviews };
};

/**
 * Wipes all applications. Useful for dev/testing only.
 */
export const clearAllApplications = async (): Promise<void> => {
    await AsyncStorage.removeItem(STORAGE_KEY);
};

export type ApplicationStatus =
    | 'Applied'
    | 'Interview Scheduled'
    | 'Interviewed'
    | 'Offer Received'
    | 'Rejected'
    | 'Withdrawn';

export interface Application {
    id: string;
    company: string;
    title: string;
    status: ApplicationStatus;
    applicationDate: string; // ISO date string: YYYY-MM-DD
    interviewDate: string;   // ISO date string or empty string
    notes: string;
    createdAt: string;       // ISO timestamp for sorting
}

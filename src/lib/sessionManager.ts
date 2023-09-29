type Session = {
    token: string;
    expiryTime: number;
    tokenType: string;
}

let session: Session | null = null;

export function saveSession(newSession: Session): void {
    session = newSession;
}

export function getSession(): Session | null {
    return session;
}

export function clearSession(): void {
    session = null;
}

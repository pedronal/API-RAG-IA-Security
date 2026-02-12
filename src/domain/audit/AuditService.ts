import {AuditEvent} from "./AuditEvent";

export interface AuditService {
    record(event: AuditEvent): Promise<void>;
}
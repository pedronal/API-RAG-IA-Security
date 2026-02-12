import {AuditService} from "../../domain/audit/AuditService";
import {AuditEventType} from "../../domain/audit/AuditEvent";

export class ConsoleAuditService implements AuditService {
    async record(event: AuditEventType): Promise<void> {
        try {
            console.log(JSON.stringify(event))
        } catch (error) {
            throw new Error('Failed to record audit event')
        }
    }

}
import {AuditService} from "../../domain/audit/AuditService";
import {AuditEvent} from "../../domain/audit/AuditEvent";

export class ConsoleAuditService implements AuditService {
    async record(event: AuditEvent): Promise<void> {
        try {
            console.log(JSON.stringify(event))
        } catch (error) {
            throw new Error('Failed to record audit event')
        }
    }

}
import {
    WebSocketGateway,
    WebSocketServer,
    OnGatewayConnection,
    OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway(3001, {
    cors: {
        origin: '*',
    },
})
export class TasksGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    server: Server;

    handleConnection(client: Socket) {
        console.log(`Cliente conectado: ${client.id}`);
    }

    handleDisconnect(client: Socket) {
        console.log(`Cliente desconectado: ${client.id}`);
    }

    sendTaskCreated(task: any) {
        this.server.emit('taskCreate', task);
        console.log(`Tarea creada: ${task.id}`);
    }

    sendTaskUpdate(task: any) {
        this.server.emit('taskUpdate', task);
        console.log(`Tarea actualizada: ${task.id}`);
    }

    sendTaskRemoved(taskId: number) {
        this.server.emit('taskDelete', taskId);
        console.log(`Tarea eliminada: ${taskId}`);
    }
}
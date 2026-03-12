from fastapi import WebSocket
from typing import List, Dict
import json

class ConnectionManager:
    """Manage WebSocket connections for real-time updates"""
    
    def __init__(self):
        self.active_connections: List[WebSocket] = []
        self.admin_connections: List[WebSocket] = []
    
    async def connect(self, websocket: WebSocket, is_admin: bool = False):
        await websocket.accept()
        if is_admin:
            self.admin_connections.append(websocket)
        else:
            self.active_connections.append(websocket)
    
    def disconnect(self, websocket: WebSocket, is_admin: bool = False):
        if is_admin and websocket in self.admin_connections:
            self.admin_connections.remove(websocket)
        elif websocket in self.active_connections:
            self.active_connections.remove(websocket)
    
    async def send_personal_message(self, message: str, websocket: WebSocket):
        await websocket.send_text(message)
    
    async def broadcast(self, message: Dict):
        """Broadcast to all user connections"""
        disconnected = []
        for connection in self.active_connections:
            try:
                await connection.send_json(message)
            except:
                disconnected.append(connection)
        
        # Remove disconnected clients
        for conn in disconnected:
            self.active_connections.remove(conn)
    
    async def broadcast_to_admins(self, message: Dict):
        """Broadcast to all admin connections"""
        disconnected = []
        for connection in self.admin_connections:
            try:
                await connection.send_json(message)
            except:
                disconnected.append(connection)
        
        # Remove disconnected clients
        for conn in disconnected:
            self.admin_connections.remove(conn)
    
    async def notify_new_business(self, business_data: Dict):
        """Notify all users about new business"""
        message = {
            "type": "new_business",
            "data": business_data
        }
        await self.broadcast(message)
    
    async def notify_business_approved(self, business_data: Dict):
        """Notify about approved business"""
        message = {
            "type": "business_approved",
            "data": business_data
        }
        await self.broadcast(message)
        await self.broadcast_to_admins(message)
    
    async def notify_pending_approval(self, business_data: Dict):
        """Notify admins about pending approval"""
        message = {
            "type": "pending_approval",
            "data": business_data
        }
        await self.broadcast_to_admins(message)
    
    async def update_heatmap(self):
        """Trigger heatmap refresh"""
        message = {
            "type": "heatmap_update",
            "data": {"refresh": True}
        }
        await self.broadcast_to_admins(message)

# Global connection manager
manager = ConnectionManager()

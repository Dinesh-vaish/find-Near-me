from fastapi import APIRouter, WebSocket, WebSocketDisconnect, Query
from websocket_manager import manager
import json

router = APIRouter()

@router.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    """WebSocket endpoint for real-time updates (users)"""
    await manager.connect(websocket, is_admin=False)
    
    try:
        while True:
            # Keep connection alive
            data = await websocket.receive_text()
            
            # Echo back for heartbeat
            await websocket.send_json({
                "type": "heartbeat",
                "status": "connected"
            })
    
    except WebSocketDisconnect:
        manager.disconnect(websocket, is_admin=False)

@router.websocket("/ws/admin")
async def admin_websocket_endpoint(
    websocket: WebSocket,
    token: str = Query(...)
):
    """WebSocket endpoint for admin real-time updates"""
    
    # TODO: Verify admin token
    # For now, accept all connections
    
    await manager.connect(websocket, is_admin=True)
    
    try:
        while True:
            data = await websocket.receive_text()
            
            # Handle admin commands
            try:
                message = json.loads(data)
                
                if message.get("type") == "refresh_stats":
                    # Trigger stats refresh
                    await websocket.send_json({
                        "type": "stats_refresh",
                        "status": "triggered"
                    })
            except:
                pass
    
    except WebSocketDisconnect:
        manager.disconnect(websocket, is_admin=True)

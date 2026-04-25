import { api } from "@/lib/ky"
import type { TBaseResponse } from "@/types/api"
import "@tanstack/react-start/server-only"
import type { TCreateEventInput, TEvent, TEventsResponse, TFindEventsInput, TUpdateEventInput } from "./schemas"

export async function fetchEvents(params?: TFindEventsInput): Promise<TEventsResponse> {
  const response = await api
    .get("events", { searchParams: params as Record<string, string> })
    .json<TBaseResponse<TEventsResponse>>()
  return response.data
}

export async function fetchEventById(eventId: string): Promise<TEvent> {
  const response = await api.get(`events/${eventId}`).json<TBaseResponse<TEvent>>()
  return response.data
}

export async function createEvent(payload: TCreateEventInput): Promise<TEvent> {
  const response = await api.post("events", { json: payload }).json<TBaseResponse<TEvent>>()
  return response.data
}

export async function updateEvent({ eventId, payload }: TUpdateEventInput): Promise<TEvent> {
  const response = await api.patch(`events/${eventId}`, { json: payload }).json<TBaseResponse<TEvent>>()
  return response.data
}

export async function deleteEvent(eventId: string): Promise<void> {
  await api.delete(`events/${eventId}`).json<TBaseResponse<void>>()
}

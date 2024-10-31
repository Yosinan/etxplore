<?php

namespace App\Http\Controllers\API;

use Exception;
use Carbon\Carbon;
use App\Models\Event;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class EventController extends Controller
{
    public function index(): JsonResponse
    {
        try {
            $events = Event::all();
            return response()->json($events);
        } catch (Exception $e) {
            Log::error($e->getMessage());
            return response()->json(['message' => 'Failed to retrieve events.', "error" => $e->getMessage()], 500);
        }
    }

    public function store(Request $request): JsonResponse
    {
        try {
            $validatedData = $request->validate([
                'name' => 'required|string|max:255',
                'description' => 'required|string',
                'media' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
                'location' => 'required|string',
                'date' => 'required|date',
            ]);

            if ($request->hasFile('media')) {
                $file = $request->file('media');
                $filename = time() . '_' . $file->getClientOriginalName();
                $file->storeAs('events', $filename, 'public');
                $validatedData['media'] = $filename;
            }

            $event = Event::create($validatedData);
            return response()->json($event, 201);
        } catch (Exception $e) {
            Log::error($e->getMessage());
            return response()->json(['message' => 'Failed to create event.', "error" => $e->getMessage()], 500);
        }
    }

    public function show($id): JsonResponse
    {
        try {
            $event = Event::findOrFail($id);

            // format the date
            $formattedDate = $event->getFormattedDate();
            return response()->json(
                [
                    'id' => $event->id,
                    'name' => $event->name,
                    'description' => $event->description,
                    'media' => $event->media,
                    'location' => $event->location,
                    'date' => $formattedDate,
                ]
            );
        } catch (Exception $e) {
            Log::error($e->getMessage());
            return response()->json(['message' => 'Failed to retrieve event.', "error" => $e->getMessage()], 500);
        }
    }

    public function update(Request $request, $id): JsonResponse
    {
        try {
            $event = Event::findOrFail($id);

            $validatedData = $request->validate([
                'name' => 'string|max:255',
                'description' => 'string',
                'media' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
                'location' => 'string',
                'date' => 'date',
            ]);

            if ($request->hasFile('media')) {
                // Delete the old file if it exists
                if ($event->media && Storage::disk('public')->exists('events/' . $event->media)) {
                    Storage::disk('public')->delete('events/' . $event->media);
                }

                $file = $request->file('media');
                $filename = time() . '_' . $file->getClientOriginalName();
                $file->storeAs('events', $filename, 'public');
                $validatedData['media'] = $filename; // Store only the filename
            }

            $event->update($validatedData);
            return response()->json($event);
        } catch (Exception $e) {
            Log::error($e->getMessage());
            return response()->json(['message' => 'Failed to update event.', "error" => $e->getMessage()], 500);
        }
    }

    public function destroy($id): JsonResponse
    {
        try {
            $event = Event::findOrFail($id);

            // Check if the media file exists and delete it
            if ($event->media && Storage::disk('public')->exists('events/' . $event->media)) {
                Storage::disk('public')->delete('events/' . $event->media);
            }

            // Delete the event
            $event->delete();

            // Return a successful response
            return response()->json(['message' => 'Event deleted successfully.'], 204);
        } catch (Exception $e) {
            Log::error($e->getMessage());
            return response()->json(['message' => 'Failed to delete the event.', "error" => $e->getMessage()], 500);
        }
    }

    public function eventsForCurrentMonth(): JsonResponse
    {
        try {
            $currentMonth = Carbon::now()->month;
            $currentYear = Carbon::now()->year;

            $events = Event::whereMonth('date', $currentMonth)
                           ->get();

            return response()->json($events);
        } catch (Exception $e) {
            Log::error($e->getMessage());
            return response()->json(['message' => 'Failed to retrieve events for the current month.', "error" => $e->getMessage()], 500);
        }
    }

    public function upcomingEvents(): JsonResponse
    {
        try {
            $today = Carbon::now()->month();

            $events = Event::where('date', '>=', $today)->get();

            return response()->json($events);
        } catch (Exception $e) {
            Log::error($e->getMessage());
            return response()->json(['message' => 'Failed to retrieve upcoming events.', "error" => $e->getMessage()], 500);
        }
    }
}
<form action="{{ route('web.events.update', $event->id) }}" method="POST" enctype="multipart/form-data">
    @csrf
    @method('PUT')
    <div class="form-group">
        <label for="name">Event Name</label>
        <input type="text" name="name" class="form-control" value="{{ $event->name }}" required>
    </div>
    <div class="form-group">
        <label for="description">Description</label>
        <textarea name="description" class="form-control" required>{{ $event->description }}</textarea>
    </div>
    <div class="form-group">
        <label for="media">Media</label>
        <input type="file" name="media" class="form-control">
    </div>
    <div class="form-group">
        <label for="location">Location</label>
        <input type="text" name="location" class="form-control" value="{{ $event->location }}" required>
    </div>
    <div class="form-group">
        <label for="date">Date</label>
        <input type="datetime-local" name="date" class="form-control" value="{{ $event->date }}" required>
    </div>
    <button type="submit" class="btn btn-primary">Update</button>
</form>

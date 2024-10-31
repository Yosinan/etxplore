<?php

namespace App\Models;

use Filament\Models\Contracts\FilamentUser;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Spatie\Permission\Traits\HasRoles;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Testing\Fluent\Concerns\Has;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable implements FilamentUser
{
    use HasFactory, Notifiable, HasRoles, HasApiTokens;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'username',
        'first_name',
        'last_name',
        'avatar',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    // Relationship with UserContribution
    public function userContributions()
    {
        return $this->hasMany(UserContribution::class);
    }

    // Relationship with Favorite
    public function favorites()
    {
        return $this->hasMany(Favorite::class);
    }

    // To get all favorited items directly
    public function favoritedItems()
    {
        return $this->morphToMany(Favorite::class, 'favoritable');
    }
    
    public function getFilamentName(): string
    {
        return $this->username ?? 'Default Name';
    }

    public function canAccessFilament(): bool
    {
        return $this->hasRole('admin'); // Replace 'admin' with the proper role
    }

    public function canAccessPanel($panel): bool
    {
        // Use canAccessFilament if no specific logic is needed for panels
        return $this->canAccessFilament();
    }

}
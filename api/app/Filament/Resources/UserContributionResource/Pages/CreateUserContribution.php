<?php

namespace App\Filament\Resources\UserContributionResource\Pages;

use App\Filament\Resources\UserContributionResource;
use Filament\Actions;
use Filament\Resources\Pages\CreateRecord;

class CreateUserContribution extends CreateRecord
{
    protected static string $resource = UserContributionResource::class;
}

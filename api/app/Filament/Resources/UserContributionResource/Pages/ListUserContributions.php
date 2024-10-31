<?php

namespace App\Filament\Resources\UserContributionResource\Pages;

use App\Filament\Resources\UserContributionResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListUserContributions extends ListRecords
{
    protected static string $resource = UserContributionResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}

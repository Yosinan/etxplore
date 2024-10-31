<?php

namespace App\Filament\Resources\UserContributionResource\Pages;

use App\Filament\Resources\UserContributionResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditUserContribution extends EditRecord
{
    protected static string $resource = UserContributionResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}

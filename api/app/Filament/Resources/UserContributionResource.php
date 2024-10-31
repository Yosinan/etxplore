<?php

namespace App\Filament\Resources;

use App\Filament\Resources\UserContributionResource\Pages;
use App\Filament\Resources\UserContributionResource\RelationManagers;
use App\Models\UserContribution;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;

class UserContributionResource extends Resource
{
    protected static ?string $model = UserContribution::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('title')
                ->required(),
                Forms\Components\TextInput::make('description')
                ->required(),
                Forms\Components\TextInput::make('media')
                ->required(),
                Forms\Components\TextInput::make('status')
                ->required(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('id'),
                Tables\Columns\TextColumn::make('description'),
                Tables\Columns\TextColumn::make('media'),
                Tables\Columns\TextColumn::make('status')
            ])
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\Action::make('approve')
                    ->label('Approve')
                    ->color('success')
                    ->action(function ($record) {
                        $record->status = 'approved';
                        $record->save();
                    }),

                Tables\Actions\Action::make('reject')
                    ->label('Reject')
                    ->color('danger')
                    ->action(function ($record) {
                        $record->status = 'rejected';
                        $record->save();
                    }),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListUserContributions::route('/'),
            'create' => Pages\CreateUserContribution::route('/create'),
            'edit' => Pages\EditUserContribution::route('/{record}/edit'),
        ];
    }
}
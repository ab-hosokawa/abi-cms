<?php

namespace App\Models\Step2_1;

use Illuminate\Database\Eloquent\Model as EloquentModel;

class Model extends EloquentModel
{
    protected $fillable = ['title', 'alias'];

    public function field()
    {
        $this->hasMany(Model::class);
    }
}

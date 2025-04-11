<?php

namespace App\Models\Step2_1;

use Illuminate\Database\Eloquent\Model as EloquentModel;

class Content extends EloquentModel
{
    protected $fillable = ['model_id'];

    public function model()
    {
        return $this->belongsTo(Model::class);
    }
}


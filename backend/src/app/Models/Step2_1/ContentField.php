<?php

namespace App\Models\Step2_1;

use Illuminate\Database\Eloquent\Model as EloquentModel;

class ContentField extends EloquentModel
{
    protected $fillable = ['content_id', 'value'];

    public function content()
    {
        return $this->belongsTo(Content::class);
    }

    public function field()
    {
        return $this->belongsTo(Field::class);
    }

}


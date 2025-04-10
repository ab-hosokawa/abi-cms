<?php

namespace app\Models\Step2_1;

use Illuminate\Database\Eloquent\Model as EloquentModel;
use App\Models\Step2_1\Model;

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


<?php

namespace App\Models\Step2_1;

use Illuminate\Database\Eloquent\Model;

class Field extends Model
{
    protected $fillable = ['title', 'model_id', 'display_name', 'type'];
}

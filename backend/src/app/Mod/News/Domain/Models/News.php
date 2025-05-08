<?php
namespace App\Mod\News\Domain\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property string $title
 * @property string $body
 */
class News extends Model
{
    use HasFactory;

    protected $table = "news";
    protected $fillable = ['title'];
}

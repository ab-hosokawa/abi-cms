<?php
namespace App\Mod\Article\Domain\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @property int $id
 * @property string $title
 * @property string $body
 */
class Article extends Model
{
    use HasFactory;

    protected $table = "articles";
    protected $fillable = ['title', 'body'];
}

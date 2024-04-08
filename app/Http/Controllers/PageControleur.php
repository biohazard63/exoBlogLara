<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class PageControleur extends Controller
{
    public function abouts()
    {
        return Inertia::render('Abouts');
    }

}

<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

// Correct import statement for Inertia

class RoleController extends Controller
{
   public function index()
{
    // Replace '1' with the id of the 'admin' role in your `roles` table
    $users = User::all();

    return Inertia::render('RoleManagement', ['users' => $users]);
}

   public function update(Request $request, $id)
{
    $role = $request->input('role');

    if ($role !== null) {
        $user = User::find($id);

        if ($user) {
            $user->role_id = $role;
            $user->save();

            return Inertia::render('RoleManagement', ['message' => 'User role updated successfully.']);
        } else {
            return Inertia::render('RoleManagement', ['message' => 'User not found.']);
        }
    }

    return Inertia::render('RoleManagement', ['message' => 'Role value cannot be null.']);
}
}

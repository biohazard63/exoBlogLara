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

public function destroy($id)
{
    \Log::info("Attempting to delete user with id: {$id}");

    $user = User::find($id);

    if (!$user) {
        \Log::error("User with id {$id} not found");
        return response()->json(['message' => 'User not found'], 404);
    }

    try {
        $user->delete();
    } catch (\Exception $e) {
        \Log::error("Error deleting user: {$e->getMessage()}");
        return response()->json(['message' => 'Error deleting user'], 500);
    }

    \Log::info("User with id {$id} deleted successfully");
    return response()->json(['message' => 'User deleted successfully'], 200);
}
}

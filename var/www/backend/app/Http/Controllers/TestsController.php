<?php
namespace App\Http\Controllers;
use App\Tests;

class TestsController extends Controller
{
  public function tests() {
    return response()->json(Tests::all());
  }
}

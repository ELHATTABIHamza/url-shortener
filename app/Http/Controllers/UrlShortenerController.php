<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ShortenedUrl;

class UrlShortenerController extends Controller
{
    public function create(Request $request)
    {
        $request->validate([
            'original_url' => 'required|url',
        ]);

        $shortUrl = $this->generateShortUrl();

        ShortenedUrl::create([
            'short_url' => $shortUrl,
            'original_url' => $request->input('original_url'),
        ]);

        return response()->json(['short_url' => $shortUrl], 201);
    }

    public function redirect($short_url)
    {
        $url = ShortenedUrl::where('short_url', $short_url)->first();

        if ($url) {
            $url->increment('click_count');

            return redirect($url->original_url);
        } else {
            abort(404);
        }
    }

    public function index()
    {
        $shortenedUrls = ShortenedUrl::orderByDesc('click_count')->get();

        if ($shortenedUrls->isEmpty()) {
            return response()->json([
                'message' => "Aucun url(s) trouvé(s)!",
            ], 401);
        } else {
            return response()->json($shortenedUrls, 200);
        }
    }

    public function show($id)
    {
        $url = ShortenedUrl::find($id);

        if ($url) {
            return response()->json($url);
        } else {
            abort(404);
        }
    }

    private function generateShortUrl()
    {
        $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $shortUrl = '';
    
        $length = 6; 
    
        for ($i = 0; $i < $length; $i++) {
            $shortUrl .= $characters[rand(0, strlen($characters) - 1)];
        }
    
        while (ShortenedUrl::where('short_url', $shortUrl)->exists()) {
            $shortUrl = '';
    
            for ($i = 0; $i < $length; $i++) {
                $shortUrl .= $characters[rand(0, strlen($characters) - 1)];
            }
        }
    
        return $shortUrl;
    }
}

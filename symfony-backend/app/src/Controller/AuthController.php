<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class AuthController
{
    #[Route('/api/login', name: 'api_login', methods: ['POST'])]
    public function login(Request $request): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $email = $data['email'] ?? '';
        $password = $data['password'] ?? '';

        if ($email === 'admin@admin.com' && $password === 'admin123') {
            return new JsonResponse([
                'token' => 'TOKEN_DE_PRUEBA',
                'user' => ['email' => $email]
            ]);
        }

        return new JsonResponse(['error' => 'Credenciales inválidas'], 401);
    }
}

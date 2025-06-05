<?php

namespace App\Controller;

use App\Entity\Supermercados;
use App\Repository\SupermercadosRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/supermercados')]
class SupermercadosController extends AbstractController
{
    #[Route('/', name: 'supermercados_index', methods: ['GET'])]
    public function index(SupermercadosRepository $supermercadosRepository): JsonResponse
    {
        $supermercados = $supermercadosRepository->findAll();

        $data = array_map(function (Supermercados $supermercado) {
            return [
                'id' => $supermercado->getId(),
                // Cambia estos campos según la entidad
                'nombre' => $supermercado->getNombre()
            ];
        }, $supermercados);

        return new JsonResponse($data);
    }

    #[Route('/{id}', name: 'supermercados_show', methods: ['GET'])]
    public function show(Supermercados $supermercado): JsonResponse
    {
        $data = [
            'id' => $supermercado->getId(),
            'nombre' => $supermercado->getNombre(),
        ];

        return new JsonResponse($data);
    }

    #[Route('/new', name: 'supermercados_new', methods: ['POST'])]
    public function new(Request $request, EntityManagerInterface $em): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $supermercado = new Supermercados();
        $supermercado->setNombre($data['nombre'] ?? null);

        $em->persist($supermercado);
        $em->flush();

        return new JsonResponse([
            'message' => 'Supermercado creado',
            'id' => $supermercado->getId(),
        ], 201);
    }

    #[Route('/{id}/edit', name: 'supermercados_edit', methods: ['PUT', 'PATCH'])]
    public function edit(Request $request, Supermercados $supermercado, EntityManagerInterface $em): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        if (isset($data['nombre'])) {
            $supermercado->setNombre($data['nombre']);
        }

        // actualiza otros campos si hay

        $em->flush();

        return new JsonResponse(['message' => 'Supermercado actualizado']);
    }

    #[Route('/{id}', name: 'supermercados_delete', methods: ['DELETE'])]
    public function delete(Supermercados $supermercado, EntityManagerInterface $em): JsonResponse
    {
        $em->remove($supermercado);
        $em->flush();

        return new JsonResponse(['message' => 'Supermercado eliminado']);
    }
}

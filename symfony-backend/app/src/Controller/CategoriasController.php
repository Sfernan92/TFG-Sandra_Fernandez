<?php

namespace App\Controller;

use App\Entity\Categorias;
use App\Form\CategoriasType;
use App\Repository\CategoriasRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/categorias')]
class CategoriasController extends AbstractController
{
    #[Route('/', name: 'categorias_index', methods: ['GET'])]
    public function index(CategoriasRepository $categoriasRepository): JsonResponse
    {
        $categorias = $categoriasRepository->findAll();

        $data = array_map(function (Categorias $categoria) {
            return [
                'id' => $categoria->getId(),
                'nombre' => $categoria->getNombre(),
                // Agrega otros campos necesarios aquí
            ];
        }, $categorias);

        return new JsonResponse($data);
    }

#[Route('/new', name: 'categorias_new', methods: ['POST'])]
public function new(Request $request, EntityManagerInterface $em): JsonResponse
{
    $data = json_decode($request->getContent(), true);

    $categoria = new Categorias();
    $categoria->setNombre($data['nombre'] ?? '');

    $em->persist($categoria);
    $em->flush();

    return new JsonResponse([
        'message' => 'Categoría creada',
        'id' => $categoria->getId(),
    ], Response::HTTP_CREATED);
}

    #[Route('/{id}', name: 'categorias_show', methods: ['GET'])]
    public function show(Categorias $categoria): JsonResponse
    {
        return new JsonResponse([
            'id' => $categoria->getId(),
            'nombre' => $categoria->getNombre(),
            // Agrega otros campos aquí
        ]);
    }

    #[Route('/{id}/edit', name: 'categorias_edit', methods: ['PUT'])]
    public function edit(Request $request, Categorias $categoria, EntityManagerInterface $em): JsonResponse
    {
        $data = json_decode($request->getContent(), true);
        $categoria->setNombre($data['nombre'] ?? $categoria->getNombre());
        // Actualiza más campos si es necesario

        $em->flush();

        return new JsonResponse(['message' => 'Categoría actualizada']);
    }

    #[Route('/{id}', name: 'categorias_delete', methods: ['DELETE'])]
    public function delete(int $id,EntityManagerInterface $em): JsonResponse {
        if (!$id) {
            return new JsonResponse(['error' => 'ID no proporcionado'], 400);
        }

        $connection = $em->getConnection();
        $sql = 'DELETE FROM categorias WHERE id = :id'; //SQL NATIVO

        try {
            $stmt = $connection->prepare($sql);
            $stmt->bindValue('id', $id);
            $stmt->executeStatement();

            return new JsonResponse(['message' => 'Categoría eliminada correctamente']);
        } catch (\Exception $e) {
            return new JsonResponse(['error' => 'Error al eliminar categoría: ' . $e->getMessage()], 500);
        }
    }

}

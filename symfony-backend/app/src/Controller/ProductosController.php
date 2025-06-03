<?php

namespace App\Controller;

use App\Entity\Productos;
use App\Repository\ProductosRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/productos')]
class ProductosController extends AbstractController
{
    #[Route('/', name: 'productos_index', methods: ['GET'])]
    public function index(ProductosRepository $productosRepository): JsonResponse
    {
        $productos = $productosRepository->findAll();

        $data = array_map(function (Productos $producto) {
            return [
                'id' => $producto->getId(),
                'nombre' => $producto->getNombre(),
                'marca' => $producto->getMarca(),
                'categoria_id' => $producto->getCategoria() ? $producto->getCategoria()->getId() : null,
            ];
        }, $productos);

        return new JsonResponse($data);
    }


    #[Route('/{id}', name: 'productos_show', methods: ['GET'])]
    public function show(Productos $producto): JsonResponse
    {
        $data = [
            'id' => $producto->getId(),
            'nombre' => $producto->getNombre(),
            'marca' => $producto->getMarca(),
            // etc...
        ];

        return new JsonResponse($data);
    }

    #[Route('/new', name: 'productos_new', methods: ['POST'])]
    public function new(Request $request, EntityManagerInterface $em): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $producto = new Productos();
        $producto->setNombre($data['nombre'] ?? null);
        $producto->setMarca($data['marca'] ?? null);

        $em->persist($producto);
        $em->flush();

        return new JsonResponse([
            'message' => 'Producto creado',
            'id' => $producto->getId(),
        ], 201);
    }

    #[Route('/{id}/edit', name: 'productos_edit', methods: ['PUT', 'PATCH'])]
    public function edit(Request $request, Productos $producto, EntityManagerInterface $em): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        if (isset($data['nombre'])) {
            $producto->setNombre($data['nombre']);
        }
        if (isset($data['marca'])) {
            $producto->setMarca($data['marca']);
        }

        $em->flush();

        return new JsonResponse([
            'message' => 'Producto actualizado',
        ]);
    }

    #[Route('/{id}', name: 'productos_delete', methods: ['DELETE'])]
    public function delete(Productos $producto, EntityManagerInterface $em): JsonResponse
    {
        $em->remove($producto);
        $em->flush();

        return new JsonResponse([
            'message' => 'Producto eliminado',
        ]);
    }
}

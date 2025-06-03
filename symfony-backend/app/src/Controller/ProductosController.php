<?php

namespace App\Controller;

use App\Entity\Productos;
use App\Form\ProductosType;
use App\Repository\ProductosRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/productos')]
class ProductosController extends AbstractController
{
    #[Route('/', name: 'productos_index', methods: ['GET'])]
    public function index(ProductosRepository $productosRepository): Response
    {
        return $this->render('productos/index.html.twig', [
            'productos' => $productosRepository->findAll(),
        ]);
    }

    #[Route('/new', name: 'productos_new', methods: ['GET', 'POST'])]
    public function new(Request $request, EntityManagerInterface $em): Response
    {
        $producto = new Productos();
        $form = $this->createForm(ProductosType::class, $producto);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $em->persist($producto);
            $em->flush();

            return $this->redirectToRoute('productos_index');
        }

        return $this->render('productos/new.html.twig', [
            'form' => $form->createView(),
        ]);
    }

    #[Route('/{id}', name: 'productos_show', methods: ['GET'])]
    public function show(Productos $producto): Response
    {
        return $this->render('productos/show.html.twig', [
            'producto' => $producto,
        ]);
    }

    #[Route('/{id}/edit', name: 'productos_edit', methods: ['GET', 'POST'])]
    public function edit(Request $request, Productos $producto, EntityManagerInterface $em): Response
    {
        $form = $this->createForm(ProductosType::class, $producto);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $em->flush();
            return $this->redirectToRoute('productos_index');
        }

        return $this->render('productos/edit.html.twig', [
            'form' => $form->createView(),
            'producto' => $producto,
        ]);
    }

    #[Route('/{id}', name: 'productos_delete', methods: ['POST'])]
    public function delete(Request $request, Productos $producto, EntityManagerInterface $em): Response
    {
        if ($this->isCsrfTokenValid('delete' . $producto->getId(), $request->request->get('_token'))) {
            $em->remove($producto);
            $em->flush();
        }

        return $this->redirectToRoute('productos_index');
    }
}

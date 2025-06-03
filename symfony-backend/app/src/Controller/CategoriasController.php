<?php

namespace App\Controller;

use App\Entity\Categorias;
use App\Form\CategoriasType;
use App\Repository\CategoriasRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/categorias')]
class CategoriasController extends AbstractController
{
    #[Route('/', name: 'categorias_index', methods: ['GET'])]
    public function index(CategoriasRepository $categoriasRepository): Response
    {
        return $this->render('categorias/index.html.twig', [
            'categorias' => $categoriasRepository->findAll(),
        ]);
    }

    #[Route('/new', name: 'categorias_new', methods: ['GET', 'POST'])]
    public function new(Request $request, EntityManagerInterface $em): Response
    {
        $categoria = new Categorias();
        $form = $this->createForm(CategoriasType::class, $categoria);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $em->persist($categoria);
            $em->flush();

            return $this->redirectToRoute('categorias_index');
        }

        return $this->render('categorias/new.html.twig', [
            'form' => $form->createView(),
        ]);
    }

    #[Route('/{id}', name: 'categorias_show', methods: ['GET'])]
    public function show(Categorias $categoria): Response
    {
        return $this->render('categorias/show.html.twig', [
            'categoria' => $categoria,
        ]);
    }

    #[Route('/{id}/edit', name: 'categorias_edit', methods: ['GET', 'POST'])]
    public function edit(Request $request, Categorias $categoria, EntityManagerInterface $em): Response
    {
        $form = $this->createForm(CategoriasType::class, $categoria);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $em->flush();
            return $this->redirectToRoute('categorias_index');
        }

        return $this->render('categorias/edit.html.twig', [
            'form' => $form->createView(),
            'categoria' => $categoria,
        ]);
    }

    #[Route('/{id}', name: 'categorias_delete', methods: ['POST'])]
    public function delete(Request $request, Categorias $categoria, EntityManagerInterface $em): Response
    {
        if ($this->isCsrfTokenValid('delete' . $categoria->getId(), $request->request->get('_token'))) {
            $em->remove($categoria);
            $em->flush();
        }

        return $this->redirectToRoute('categorias_index');
    }
}

<?php

namespace App\Controller;

use App\Entity\Precios;
use App\Form\PreciosType;
use App\Repository\PreciosRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/precios')]
class PreciosController extends AbstractController
{
    #[Route('/', name: 'precios_index', methods: ['GET'])]
    public function index(PreciosRepository $preciosRepository): Response
    {
        return $this->render('precios/index.html.twig', [
            'precios' => $preciosRepository->findAll(),
        ]);
    }

    #[Route('/new', name: 'precios_new', methods: ['GET', 'POST'])]
    public function new(Request $request, EntityManagerInterface $em): Response
    {
        $precio = new Precios();
        $form = $this->createForm(PreciosType::class, $precio);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $em->persist($precio);
            $em->flush();

            return $this->redirectToRoute('precios_index');
        }

        return $this->render('precios/new.html.twig', [
            'form' => $form->createView(),
        ]);
    }

    #[Route('/{id}', name: 'precios_show', methods: ['GET'])]
    public function show(Precios $precio): Response
    {
        return $this->render('precios/show.html.twig', [
            'precio' => $precio,
        ]);
    }

    #[Route('/{id}/edit', name: 'precios_edit', methods: ['GET', 'POST'])]
    public function edit(Request $request, Precios $precio, EntityManagerInterface $em): Response
    {
        $form = $this->createForm(PreciosType::class, $precio);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $em->flush();
            return $this->redirectToRoute('precios_index');
        }

        return $this->render('precios/edit.html.twig', [
            'form' => $form->createView(),
            'precio' => $precio,
        ]);
    }

    #[Route('/{id}', name: 'precios_delete', methods: ['POST'])]
    public function delete(Request $request, Precios $precio, EntityManagerInterface $em): Response
    {
        if ($this->isCsrfTokenValid('delete' . $precio->getId(), $request->request->get('_token'))) {
            $em->remove($precio);
            $em->flush();
        }

        return $this->redirectToRoute('precios_index');
    }
}

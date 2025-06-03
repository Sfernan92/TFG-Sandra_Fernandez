<?php

namespace App\Controller;

use App\Entity\Supermercados;
use App\Form\SupermercadosType;
use App\Repository\SupermercadosRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/supermercados')]
class SupermercadosController extends AbstractController
{
    #[Route('/', name: 'supermercados_index', methods: ['GET'])]
    public function index(SupermercadosRepository $supermercadosRepository): Response
    {
        return $this->render('supermercados/index.html.twig', [
            'supermercados' => $supermercadosRepository->findAll(),
        ]);
    }

    #[Route('/new', name: 'supermercados_new', methods: ['GET', 'POST'])]
    public function new(Request $request, EntityManagerInterface $em): Response
    {
        $supermercado = new Supermercados();
        $form = $this->createForm(SupermercadosType::class, $supermercado);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $em->persist($supermercado);
            $em->flush();

            return $this->redirectToRoute('supermercados_index');
        }

        return $this->render('supermercados/new.html.twig', [
            'form' => $form->createView(),
        ]);
    }

    #[Route('/{id}', name: 'supermercados_show', methods: ['GET'])]
    public function show(Supermercados $supermercado): Response
    {
        return $this->render('supermercados/show.html.twig', [
            'supermercado' => $supermercado,
        ]);
    }

    #[Route('/{id}/edit', name: 'supermercados_edit', methods: ['GET', 'POST'])]
    public function edit(Request $request, Supermercados $supermercado, EntityManagerInterface $em): Response
    {
        $form = $this->createForm(SupermercadosType::class, $supermercado);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $em->flush();
            return $this->redirectToRoute('supermercados_index');
        }

        return $this->render('supermercados/edit.html.twig', [
            'form' => $form->createView(),
            'supermercado' => $supermercado,
        ]);
    }

    #[Route('/{id}', name: 'supermercados_delete', methods: ['POST'])]
    public function delete(Request $request, Supermercados $supermercado, EntityManagerInterface $em): Response
    {
        if ($this->isCsrfTokenValid('delete' . $supermercado->getId(), $request->request->get('_token'))) {
            $em->remove($supermercado);
            $em->flush();
        }

        return $this->redirectToRoute('supermercados_index');
    }
}

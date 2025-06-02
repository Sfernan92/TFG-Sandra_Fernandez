<?php

namespace App\Entity;

use App\Repository\SupermercadosRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: SupermercadosRepository::class)]
class Supermercados
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 100)]
    private ?string $nombre = null;

    #[ORM\OneToMany(mappedBy: 'supermercados', targetEntity: Precios::class, orphanRemoval: true, cascade: ['persist', 'remove'])]
    private Collection $precios;

    public function __construct()
    {
        $this->precios = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNombre(): ?string
    {
        return $this->nombre;
    }

    public function setNombre(string $nombre): static
    {
        $this->nombre = $nombre;
        return $this;
    }

    /**
     * @return Collection<int, Precios>
     */
    public function getPrecios(): Collection
    {
        return $this->precios;
    }

    public function addPrecio(Precios $precio): static
    {
        if (!$this->precios->contains($precio)) {
            $this->precios[] = $precio;
            $precio->setSupermercado($this);
        }

        return $this;
    }

    public function removePrecio(Precios $precio): static
    {
        if ($this->precios->removeElement($precio)) {
            if ($precio->getSupermercado() === $this) {
                $precio->setSupermercado(null);
            }
        }

        return $this;
    }
}

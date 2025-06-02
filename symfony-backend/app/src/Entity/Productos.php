<?php

namespace App\Entity;

use App\Repository\ProductosRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: ProductosRepository::class)]
class Productos
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 150)]
    private ?string $nombre = null;

    #[ORM\Column(length: 100)]
    private ?string $marca = null;

    #[ORM\ManyToOne(targetEntity: Categorias::class, inversedBy: 'productos')]
    #[ORM\JoinColumn(nullable: false)]
    private Categorias $categoria;

    #[ORM\OneToMany(mappedBy: 'productos', targetEntity: Precios::class, orphanRemoval: true, cascade: ['persist', 'remove'])]
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

    public function getMarca(): ?string
    {
        return $this->marca;
    }

    public function setMarca(string $marca): static
    {
        $this->marca = $marca;
        return $this;
    }

    public function getCategoria(): ?Categorias
    {
        return $this->categoria;
    }

    public function setCategoria(Categorias $categoria): static
    {
        $this->categoria = $categoria;
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
            $precio->setProducto($this);
        }

        return $this;
    }

    public function removePrecio(Precios $precio): static
    {
        if ($this->precios->removeElement($precio)) {
            // set the owning side to null (unless already changed)
            if ($precio->getProducto() === $this) {
                $precio->setProducto(null);
            }
        }

        return $this;
    }
}

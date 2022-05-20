<?php

declare(strict_types=1);

namespace JeroenG\OntologyPublish\Domain\Runners;

use JeroenG\Ontology\Application\FilesystemInterface;
use JeroenG\Ontology\Domain\ClassList;
use JeroenG\Ontology\Domain\Generators\GeneratorInterface;
use Webmozart\Assert\Assert;

final class PublicRunner implements GeneratorRunnerInterface
{
    /** @var GeneratorInterface[] */
    private array $generators;

    private FilesystemInterface $filesystem;

    public function __construct(FilesystemInterface $filesystem)
    {
        $this->filesystem = $filesystem;
    }

    public function setGenerators(array $generators): void
    {
        Assert::allIsInstanceOf($generators, GeneratorInterface::class);
        $this->generators = $generators;
    }

    public function run(ClassList $list): void
    {
        foreach ($list->getUniqueAttributes() as $attribute) {
            $this->generate($attribute, $list);
        }
    }

    private function generate(string $attributeName, ClassList $list): void
    {
        foreach ($this->getGeneratorsForType($attributeName) as $generator) {
            $directory = $generator->generate($list);
            $this->filesystem->save($directory);
        }
    }

    /** @return GeneratorInterface[] */
    private function getGeneratorsForType(string $type): array
    {
        return array_filter($this->generators, fn(GeneratorInterface $g) => $g->supports($type));
    }
}

---
title: OrbStack Provider — Terraform for the Mac
displayTitle: OrbStack Provider
summary: "A from-scratch Terraform provider so homelab setups, starting with OrbStack, have a trail in .tf files."
draft: false
date:  2026-10-01
github: https://github.com/machugram/terraform-provider-orbstack
live: https://registry.terraform.io/providers/machugram/orbstack/latest
liveLabel: registry
stack: [Go, Terraform]
featured: true
order: 1
---

**OrbStack Provider** is a Terraform provider I wrote from scratch so a homelab has a trail. The first setups that needed it were on [OrbStack](https://orbstack.dev): Linux machines through `orbctl`, and containers through the Docker engine it already runs. Published as [`machugram/orbstack`](https://registry.terraform.io/providers/machugram/orbstack/latest).

A machine I built last month lived in whatever commands I still remembered. Terraform is the trail: the file is the setup, `plan` shows the drift, `apply` rebuilds it, `destroy` takes it down.

```hcl
resource "orbstack_machine" "dev" {
  name       = "dev"
  image      = "ubuntu:noble"
  cpus       = 2
  memory_mib = 2048
  disk_gib   = 16
}

resource "orbstack_container" "web" {
  name  = "web"
  image = "nginx:latest"
  ports = { "8080" = "80" }
}
```

The longer writeup of the lifecycle rules is [[tech/orbstack-terraform | Two Control Planes on One Mac]].

## Why I built it

OrbStack was the place that needed a trail first. The builds on this Mac were a Linux machine with real CPU, memory, and disk, and the containers beside it. Those lived as `orbctl` and `docker` commands. I wanted them in the same `.tf` files as the rest of the lab.

[Robert de Bock's provider](https://github.com/robertdebock/terraform-provider-orbstack) was the published OrbStack provider. It creates a machine and reads `orb info`. CPU, memory, disk, isolation, mounts, and containers sit outside that surface. That was too small for the builds I wanted to record.

I started over. Machines take the limits `orbctl` already accepts. One container resource on the OrbStack Docker socket so a web process is a block in the same file as the machine. The general Docker provider can do the container half, and it asks for an image resource, nested port blocks, and a socket. The file I wanted is the short one above.

Machine state stores the ULID from `orbctl info`, so a rename stays an in-place update. Container state stores the engine container id. `go test` never starts OrbStack.

## Tech Stack

- **Go** — Terraform Plugin Framework, module `github.com/machugram/terraform-provider-orbstack`
- **orbctl** — Linux machines: create, limits, rename, power, JSON info
- **Docker Engine API** — containers on the OrbStack socket
- **GoReleaser** — a `v*` tag builds the signed GitHub release the Terraform Registry publishes

## What it does

- CPU, memory, disk, isolation, and mounts on `orbstack_machine`
- Name an image on `orbstack_container` and create pulls it. No separate image resource
- Image, cloud-init, and mounts replace a machine. CPU, memory, and disk update in place
- Data sources for one machine, all machines, and a container
- Offline tests for argv, JSON, and port mapping

Kubernetes, Compose, image builds, custom networks, and file copy are out of this pass. `orbctl push` has no delete, so a file resource would create something Terraform cannot destroy.

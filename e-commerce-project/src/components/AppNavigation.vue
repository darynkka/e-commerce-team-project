<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <router-link class="navbar-brand ms-3" to="/">E-COMMERCE</router-link>
    <div class="collapse navbar-collapse">
      <ul class="navbar-nav ms-auto pe-3">
        <li class="nav-item">
          <router-link class="nav-link" to="/favorites">
            <i class="bi bi-heart"></i> Favourites
          </router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/cart">
            <i class="bi bi-cart"></i> Cart
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

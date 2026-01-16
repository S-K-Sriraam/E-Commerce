import React from "react";
import { link } from "react-router-dom";

function navbar() {
  return (
    <>
      <nav class="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark">
  <div class="container-fluid">
    <link class="navbar-brand" href="#">NEWS</link>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <link class="nav-link active" aria-current="page" to="/business">Business</link>
        </li>
        <li class="nav-item">
          <link class="nav-link active" aria-current="page" to="/entertainment">Entertainment</link>
        </li>
      </ul>
      
    </div>
  </div>
</nav>
    </>
  );
}

export default navbar;

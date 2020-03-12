FROM rust:1.39
EXPOSE 1212
WORKDIR /rust-backend
RUN cargo install cargo-watch
COPY ./rust-backend/Cargo.toml ./rust-backend/Cargo.lock ./
COPY ./rust-backend/src ./src

CMD [ "cargo", "watch", "-x", "run", "-x", "test" ]

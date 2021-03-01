FROM golang:1.15 as builder
WORKDIR /build
COPY ./ ./
RUN CGO_ENABLED=0 go build -o /build/api

FROM scratch
COPY --from=builder /build/api /go/bin/api
EXPOSE 8080
ENTRYPOINT ["/go/bin/api"]
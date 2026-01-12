use std::path::PathBuf;

fn main() -> Result<(), Box<dyn std::error::Error>> {
    let proto_dir = PathBuf::from("../shared/proto");
    let proto_files = &[proto_dir.join("chat/v1/health.proto")];

    // Tell Cargo to rerun if proto files change
    for proto in proto_files {
        println!("cargo:rerun-if-changed={}", proto.display());
    }

    tonic_build::configure()
        .build_server(true)
        .build_client(false)
        .compile_protos(proto_files, &[&proto_dir])?;

    Ok(())
}

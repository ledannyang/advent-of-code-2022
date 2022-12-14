ThisBuild / version := "0.1.0-SNAPSHOT"

ThisBuild / scalaVersion := "2.13.10"

lazy val root = (project in file("."))
  .settings(
    name := "advent-of-code-2022"
  )

val catsEffectVersion = "3.4.2"

libraryDependencies ++=Seq(
  "org.typelevel" %% "cats-effect" % catsEffectVersion
)

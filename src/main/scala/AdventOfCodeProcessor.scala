import cats.effect.kernel.Sync
import cats.effect.{ExitCode, IO, IOApp}

object AdventOfCodeProcessor extends IOApp {
  override def run(args: List[String]): IO[ExitCode] = Sync[IO].delay(ExitCode.Success)
}
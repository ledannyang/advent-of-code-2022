package day1_2024

import cats.effect.kernel.Sync
import cats.effect.{ExitCode, IO, IOApp}
import cats.implicits.catsSyntaxEitherId
import parser.FileParser

import scala.util.{Failure, Success, Try}

object AdventOfCodeProcessor extends IOApp {
  override def run(args: List[String]): IO[ExitCode] =
    for {
      solution <- AdventOfCode.solve()
      _ = println(s"Size: $solution")
    } yield ExitCode.Success
}


object AdventOfCode {

  def readFromFile(): IO[Either[Throwable, List[String]]] = Try(FileParser.parse("src/main/scala/day1_2024/input/input.txt")) match {
    case Failure(ex) => Sync[IO].delay(ex.asLeft[List[String]])
    case Success(res) => Sync[IO].delay(res.asRight[Throwable])
  }

  def normaliseFile(strList: List[String]): (List[Int], List[Int]) =
    strList.map(str => {
      val s = str.replace("   ", ",").split(",")
      val a = s(0).toInt
      val b = s(1).toInt

      (a, b)
    }).unzip

  def calculateDistance(l1: List[Int], l2: List[Int]): Int = {
    val orderedL1 = l1.sorted
    val orderedL2 = l2.sorted

    orderedL1.indices
      .map(i => {
        val a = orderedL1(i)
        val b = orderedL2(i)

        Math.abs(a - b)
      }).toList.sum
  }

  def solve(): IO[Int] =
    for {
      maybeRead <- readFromFile()
      tuples <- maybeRead match {
        case Left(ex) => Sync[IO].raiseError[(List[Int], List[Int])](new Throwable(ex.getMessage))
        case Right(fileStr) => Sync[IO].delay(normaliseFile(fileStr))
      }
      res = calculateDistance(tuples._1, tuples._2)
    } yield res


}

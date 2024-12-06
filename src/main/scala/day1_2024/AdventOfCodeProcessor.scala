package day1_2024

import cats.effect.kernel.Sync
import cats.effect.{ExitCode, IO, IOApp}
import parser.FileParser

object AdventOfCodeProcessor extends IOApp {
  override def run(args: List[String]): IO[ExitCode] = {

    for {
      solution <- Sync[IO].delay(AdventOfCode.solve())
      _ = println(s"Size: $solution")
    } yield ExitCode.Success
  }
}


object AdventOfCode {

  def readFromFile(): List[String] = FileParser.parse("src/main/scala/day1_2024/input/input.txt")

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


  def solve(): Int = {
    val l = readFromFile()
    val (l1, l2) = normaliseFile(l)

    calculateDistance(l1, l2)
  }

}

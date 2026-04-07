#!/bin/bash

set -euo pipefail

repo_root="$(cd "$(dirname "$0")/.." && pwd)"
base="$repo_root/src/main/java/com/learning/javamissing"

common_sources=$(cat <<'EOF'
- Oracle Java SE overview: https://www.oracle.com/java/technologies/java-se-glance.html
- OpenJDK JEP index: https://openjdk.org/jeps/0
- Java Language Specification: https://docs.oracle.com/javase/specs/
- Java API documentation: https://docs.oracle.com/en/java/
- Effective Java, 3rd Edition: https://www.informit.com/store/effective-java-9780134686042
- Core Java, Volume I: https://www.informit.com/store/core-java-volume-i-fundamentals-9780135558577
- Core Java, Volume II: https://www.informit.com/store/core-java-volume-ii-advanced-features-9780135558690
EOF
)

to_title() {
  local value="$1"
  value="${value#sec[0-9][0-9]_}"
  value="${value#ch[0-9][0-9]_}"
  value="${value//_/ }"
  printf '%s' "$value" | perl -pe 's/\b(\w)/\U$1/g'
}

section_links() {
  local section_name="$1"

  case "$section_name" in
    sec01_fundamentals)
      cat <<'EOF'
- Learn Java 17 Programming: https://www.packtpub.com/en-us/product/learn-java-17-programming-second-edition-9781803241432
- Core Java, Volume I: https://www.informit.com/store/core-java-volume-i-fundamentals-9780135558577
EOF
      ;;
    sec02_collections)
      cat <<'EOF'
- Core Java, Volume I: https://www.informit.com/store/core-java-volume-i-fundamentals-9780135558577
- Effective Java, 3rd Edition: https://www.informit.com/store/effective-java-9780134686042
EOF
      ;;
    sec03_generics)
      cat <<'EOF'
- Effective Java, 3rd Edition: https://www.informit.com/store/effective-java-9780134686042
- Core Java, Volume I: https://www.informit.com/store/core-java-volume-i-fundamentals-9780135558577
EOF
      ;;
    sec04_streams_and_functional_style)
      cat <<'EOF'
- Modern Java in Action: https://www.manning.com/books/modern-java-in-action
- Core Java, Volume II: https://www.informit.com/store/core-java-volume-ii-advanced-features-9780135558690
EOF
      ;;
    sec05_multithreading_and_concurrency)
      cat <<'EOF'
- Java Concurrency in Practice: https://www.informit.com/store/java-concurrency-in-practice-9780321349606
- OpenJDK JEP index: https://openjdk.org/jeps/0
EOF
      ;;
    sec06_design_patterns)
      cat <<'EOF'
- Head First Design Patterns: https://www.oreilly.com/library/view/head-first-design/9781492077992/
- Refactoring.Guru Strategy Pattern: https://refactoring.guru/design-patterns/strategy
EOF
      ;;
    sec07_principles_and_solid)
      cat <<'EOF'
- Clean Architecture: https://www.informit.com/store/clean-architecture-a-craftsmans-guide-to-software-structure-9780134494166
- Agile Software Development, Principles, Patterns, and Practices: https://www.pearson.com/en-us/subject-catalog/p/agile-software-development-principles-patterns-and-practices/P200000003093/9780135974445
EOF
      ;;
    sec08_internal_of_jvm)
      cat <<'EOF'
- Inside the Java Virtual Machine: https://www.artima.com/insidejvm/ed2/
- Java Performance, 2nd Edition: https://www.oreilly.com/library/view/java-performance-2nd/9781492056102/
EOF
      ;;
    sec09_hidden_java_features)
      cat <<'EOF'
- Effective Java, 3rd Edition: https://www.informit.com/store/effective-java-9780134686042
- Java API documentation: https://docs.oracle.com/en/java/
EOF
      ;;
    sec10_reflection_and_metadata)
      cat <<'EOF'
- Java API documentation: https://docs.oracle.com/en/java/
- Core Java, Volume I: https://www.informit.com/store/core-java-volume-i-fundamentals-9780135558577
EOF
      ;;
    sec11_exception_handling)
      cat <<'EOF'
- Core Java, Volume I: https://www.informit.com/store/core-java-volume-i-fundamentals-9780135558577
- Effective Java, 3rd Edition: https://www.informit.com/store/effective-java-9780134686042
EOF
      ;;
    sec12_networking)
      cat <<'EOF'
- Java API documentation: https://docs.oracle.com/en/java/
- Core Java, Volume II: https://www.informit.com/store/core-java-volume-ii-advanced-features-9780135558690
EOF
      ;;
    sec13_io_and_data_access)
      cat <<'EOF'
- Core Java, Volume II: https://www.informit.com/store/core-java-volume-ii-advanced-features-9780135558690
- Modern Java in Action: https://www.manning.com/books/modern-java-in-action
EOF
      ;;
    sec14_famous_design_problems)
      cat <<'EOF'
- Grokking the Object Oriented Design Interview: https://www.educative.io/courses/grokking-the-object-oriented-design-interview
- Head First Design Patterns: https://www.oreilly.com/library/view/head-first-design/9781492077992/
EOF
      ;;
    sec15_clean_code_and_refactoring)
      cat <<'EOF'
- Clean Code, 2nd Edition: https://www.informit.com/store/clean-code-a-handbook-of-agile-software-craftsmanship-9780135398579
- Refactoring, 2nd Edition: https://www.informit.com/store/refactoring-improving-the-design-of-existing-code-9780134757698
EOF
      ;;
    sec16_core_data_time_and_text)
      cat <<'EOF'
- Core Java, Volume II: https://www.informit.com/store/core-java-volume-ii-advanced-features-9780135558690
- Modern Java in Action: https://www.manning.com/books/modern-java-in-action
EOF
      ;;
    sec17_language_modeling_and_modern_types)
      cat <<'EOF'
- Data-Oriented Programming in Java: https://www.manning.com/books/data-oriented-programming-in-java
- Core Java, Volume I: https://www.informit.com/store/core-java-volume-i-fundamentals-9780135558577
EOF
      ;;
    sec18_architecture_and_integration)
      cat <<'EOF'
- Modern Java in Action: https://www.manning.com/books/modern-java-in-action
- Clean Architecture: https://www.informit.com/store/clean-architecture-a-craftsmans-guide-to-software-structure-9780134494166
EOF
      ;;
    sec19_testing_and_quality)
      cat <<'EOF'
- Unit Testing: Principles, Practices, and Patterns: https://www.manning.com/books/unit-testing
- Refactoring, 2nd Edition: https://www.informit.com/store/refactoring-improving-the-design-of-existing-code-9780134757698
EOF
      ;;
    *)
      printf '%s\n' "- Java API documentation: https://docs.oracle.com/en/java/"
      ;;
  esac
}

for section_dir in "$base"/sec[0-9][0-9]_*; do
  [[ -d "$section_dir" ]] || continue
  section_name="$(basename "$section_dir")"

  while IFS= read -r chapter_dir; do
    chapter_name="$(basename "$chapter_dir")"
    chapter_title="$(to_title "$chapter_name")"
    cat > "$chapter_dir/Sources.md" <<EOF
# Sources - $chapter_title

## Official References

$common_sources

## Section-Focused References

$(section_links "$section_name")

## Writing Rule

- use these references to improve accuracy and coverage
- do not copy protected text directly
- write simpler original explanations for learners
- keep examples runnable, small, and chapter specific
EOF
  done < <(find "$section_dir" -mindepth 1 -maxdepth 1 -type d -name 'ch[0-9][0-9]_*' | sort)
done

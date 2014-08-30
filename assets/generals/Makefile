SVGS = $(patsubst %.tex,%.svg,$(wildcard gen*.tex))

all: $(SVGS)

%.svg: %.tex preamble.tex
	pdflatex -interaction=nonstopmode -shell-escape $<

purge: clean
	-rm *.svg

clean:
	-rm *.aux
	-rm *.log
	-rm *.pdf
